import React from "react";

function layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      {modal}
      {children}
    </div>
  );
}

export default layout;
