export default function HeaderContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <header className="flex justify-between items-center pb-4 pt-2">
      {children}
    </header>
  )
}
