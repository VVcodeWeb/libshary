import { GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';

function buildPrismaInclude(
  fieldsByTypeName: Record<string, any>,
): Record<string, any> {
  const include: Record<string, any> = {};
  for (const key in fieldsByTypeName) {
    const field = fieldsByTypeName[key];
    if (
      field.fieldsByTypeName &&
      Object.keys(field.fieldsByTypeName).length > 0
    ) {
      const [typeNameKey] = Object.keys(field.fieldsByTypeName);

      include[key] = {
        include: buildPrismaInclude(field.fieldsByTypeName[typeNameKey]),
      };
    } else {
      continue;
    }
  }

  return include;
}

export function generatePrismaInclude(
  info: GraphQLResolveInfo,
): Record<string, any> {
  const parsedInfo = parseResolveInfo(info) as ResolveTree;

  if (!parsedInfo || !parsedInfo.fieldsByTypeName) {
    throw new Error('Failed to parse GraphQL resolve info.');
  }

  const rootFields = parsedInfo.fieldsByTypeName;
  const [rootKey] = Object.keys(rootFields);

  if (!rootKey) return {};

  return buildPrismaInclude(rootFields[rootKey]);
}
