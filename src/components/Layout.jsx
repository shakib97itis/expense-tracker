export default function Layout({children}) {
  return (
    <div className="App">
      <div className="header">
        <h1>Expense Tracker Application</h1>
      </div>

      <div className="main">
        <div className="container">{children}</div>
      </div>

      <div className="footer">
        &copy;{new Date().getFullYear()} All Rights Reserved.
      </div>
    </div>
  );
}
