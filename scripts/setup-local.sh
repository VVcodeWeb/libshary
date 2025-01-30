#!/bin/bash

set -e  # Exit on error
echo "🚀 Starting local Kubernetes setup..."
# Setup node labels properly
echo "Setting up node labels..."
kubectl label nodes k8s-worker  node-role.kubernetes.io/application=true --overwrite
kubectl label nodes controle    node-role.kubernetes.io/monitoring=true --overwrite

# Install ingress-nginx using Helm
echo "Installing ingress-nginx..."
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.publishService.enabled=true \
  --set controller.service.type=NodePort

# Wait for ingress to be ready
echo "Waiting for ingress controller..."
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=180s || {
    echo "❌ Error: Ingress controller not ready"
    kubectl get pods -n ingress-nginx
    exit 1
}


# Create namespace
echo "Creating namespace..."
kubectl apply -f k8s/base/namespace.yaml

# Create secrets
echo "Creating development secrets..."
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: libshary
type: Opaque
data:
  GOOGLE_CLIENT_SECRET: $(echo -n "dummy" | base64)
  GOOGLE_CLIENT_ID: $(echo -n "dummy" | base64)
  GOOGLE_BOOKS_API_KEY: $(echo -n "dummy" | base64)
  NEXTAUTH_SECRET: $(echo -n "dummy" | base64)
  DATABASE_PASSWORD: $(echo -n "local-db-pass" | base64)
  REDIS_PASSWORD: $(echo -n "local-redis-pass" | base64)
  AUTH_SECRET: $(echo -n "local-auth-secret" | base64)
EOF

cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
metadata:
  name: grafana-credentials
  namespace: libshary
type: Opaque
data:
  GF_SECURITY_ADMIN_USER: $(echo -n "admin" | base64)
  GF_SECURITY_ADMIN_PASSWORD: $(echo -n "local-password" | base64)
EOF


kubectl apply -k k8s/base
kubectl apply -k k8s/development
echo "Waiting for services to be ready..."
sleep 10

# Wait for deployments
echo "Waiting for deployments..."
for deployment in  redis api web booksearch grafana prometheus postgres; do
    echo "Waiting for $deployment..."
    kubectl rollout status deployment/$deployment -n libshary --timeout=120s || {
        echo "❌ Error: $deployment deployment failed"
        kubectl get pods -n libshary -l app=$deployment
        kubectl describe pods -n libshary -l app=$deployment
        exit 1
    }
done

# Show status
echo "📊 Deployment Status:"
kubectl get pods -n libshary
kubectl get ingress -n libshary

echo "
✅ Setup complete! To access the services:

1. Add to /etc/hosts (if not already added):
   127.0.0.1 dev.libshary.com

2. Start tunnel (in a separate terminal):
   minikube tunnel

3. Access the application:
   🌐 Web UI: http://dev.libshary.com
   🔌 API: http://dev.libshary.com/api

Useful commands:
- View pods: kubectl get pods -n libshary
- View logs: kubectl logs -n libshary <pod-name>
- Restart deployment: kubectl rollout restart deployment/<name> -n libshary
"
