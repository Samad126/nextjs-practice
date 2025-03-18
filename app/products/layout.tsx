function layout({
  children,
  cats,
}: {
  children: React.ReactNode;
  cats: React.ReactNode;
}) {
  return (
    <div>
      {cats}
      {children}
    </div>
  );
}

export default layout;
