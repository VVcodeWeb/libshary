import ThemeToggle from "@/components/(side-bar)/ThemeToggle";

export default function ShelvesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="drawer drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side min-w-52 bg-base-300">
        <div className="h-full w-full p-4 flex flex-col justify-between">
          <div>Side bar</div>
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
