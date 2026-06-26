export default function Layout({children}) {
  return (
    <div class="App">
      <div class="header">
        <h1>Expense Tracker Application</h1>
      </div>

      <div class="main">
        <div class="container">{children}</div>
      </div>

      <div class="footer">
        &copy;{new Date().getFullYear()} All Rights Reserved.
      </div>
    </div>
  );
}
