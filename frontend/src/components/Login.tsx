import { useThemeContext } from '../hooks/useTheme';

const LoginPage = () => {
  const { systemTheme } = useThemeContext();

  return (
    <>
      <main
        style={{ boxSizing: "border-box", display: "grid", height: "100%" }}
      >
        <div
          id="pageLogin"
          className="page pageLogin active"
          style={{
            boxSizing: "border-box",
            gap: "1rem",
            alignItems: "center",
            display: "flex",
            gridAutoFlow: "column",
            height: "100%",
            justifyContent: "space-around",
            opacity: 1,
          }}
        >
          <div
            className="register side"
            style={{
              boxSizing: "border-box",
              gap: "0.5rem",
              display: "grid",
              gridTemplateColumns: "1fr",
              justifyContent: "center",
            }}
          >
            <div className="title" style={{ boxSizing: "border-box" }}>
              <b>register</b>
            </div>
            <form
              autoComplete="nope"
              style={{
                boxSizing: "border-box",
                gap: "0.5rem",
                display: "grid",
                width: "100%",
              }}
            >
              <div
                className="inputAndIndicator"
                style={{ boxSizing: "border-box", position: "relative" }}
              >
                <input
                  className="usernameInput"
                  autoComplete="new-username"
                  placeholder="username"
                  style={{
                    boxSizing: "border-box",
                    margin: "0px",
                    overflow: "visible",
                    background: '#262223',	
                    border: "none",
                    borderRadius: "0.5rem",
                    outline: "none",
                    padding: "0.5em",
                    caretColor: systemTheme.text.primary,
                    color: systemTheme.text.primary,
                    fontFamily:
                      '"Roboto Mono", "Roboto Mono", "Vazirmatn", monospace',
                    fontSize: "1em",
                    lineHeight: "1.25em",
                    width: "100%",
                    
                  }}
                />
              </div>
              <div
                className="inputAndIndicator"
                style={{ boxSizing: "border-box", position: "relative" }}
              >
                <input
                  className="emailInput"
                  type="email"
                  autoComplete="new-email"
                  placeholder="email"
                  style={{
                    boxSizing: "border-box",
                    margin: "0px",
                    overflow: "visible",
                    background: "#262223",
                    border: "none",
                    borderRadius: "0.5rem",
                    outline: "none",
                    padding: "0.5em",
                    caretColor: systemTheme.text.primary,
                    color: systemTheme.text.primary,
                    fontFamily:
                      '"Roboto Mono", "Roboto Mono", "Vazirmatn", monospace',
                    fontSize: "1em",
                    lineHeight: "1.25em",
                    width: "15rem",
                  }}
                />
              </div>
              <div
                className="inputAndIndicator"
                style={{ boxSizing: "border-box", position: "relative" }}
              >
                <input
                  className="verifyEmailInput"
                  type="email"
                  autoComplete="verify-email"
                  placeholder="verify email"
                  style={{
                    boxSizing: "border-box",
                    margin: "0px",
                    overflow: "visible",
                    background: "#262223",
                    border: "none",
                    borderRadius: "0.5rem",
                    outline: "none",
                    padding: "0.5em",
                    caretColor: systemTheme.text.primary,
                    color: systemTheme.text.primary,
                    fontFamily:
                      '"Roboto Mono", "Roboto Mono", "Vazirmatn", monospace',
                    fontSize: "1em",
                    lineHeight: "1.25em",
                    width: "15rem",
                  }}
                />
              </div>
              <div
                className="inputAndIndicator"
                style={{ boxSizing: "border-box", position: "relative" }}
              >
                <input
                  className="passwordInput"
                  name="new-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="password"
                  style={{
                    boxSizing: "border-box",
                    margin: "0px",
                    overflow: "visible",
                    background: "#262223",
                    border: "none",
                    borderRadius: "0.5rem",
                    outline: "none",
                    padding: "0.5em",
                    caretColor: systemTheme.text.primary,
                    color: systemTheme.text.primary,
                    fontFamily:
                      '"Roboto Mono", "Roboto Mono", "Vazirmatn", monospace',
                    fontSize: "1em",
                    lineHeight: "1.25em",
                    width: "15rem",
                  }}
                />
              </div>
              <div
                className="inputAndIndicator"
                style={{ boxSizing: "border-box", position: "relative" }}
              >
                <input
                  className="verifyPasswordInput"
                  name="verify-password"
                  type="password"
                  autoComplete="verify-password"
                  placeholder="verify password"
                  style={{
                    boxSizing: "border-box",
                    margin: "0px",
                    overflow: "visible",
                    background: "#262223",
                    border: "none",
                    borderRadius: "0.5rem",
                    outline: "none",
                    padding: "0.5em",
                    caretColor: systemTheme.text.primary,
                    color: systemTheme.text.primary,
                    fontFamily:
                      '"Roboto Mono", "Roboto Mono", "Vazirmatn", monospace',
                    fontSize: "1em",
                    lineHeight: "1.25em",
                    width: "15rem",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  boxSizing: "border-box",
                  margin: "0px",
                  overflow: "visible",
                  textTransform: "none",
                  placeContent: "center",
                  background: "#262223",
                  border: "none",
                  borderRadius: "0.5rem",
                  gap: "0.5em",
                  padding: "0.5em",
                  transition:
                    "background 0.125s ease 0s, color 0.125s ease 0s, opacity 0.125s ease 0s",
                  alignItems: "baseline",
                  color: systemTheme.text.primary,
                  cursor: "pointer",
                  display: "inline-flex",
                  fontFamily: "inherit",
                  fontSize: "1em",
                  height: "min-content",
                  lineHeight: 1.25,
                  textAlign: "center",
                  userSelect: "none",
                  appearance: "button",
                }}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div
            className="login side"
            style={{
              boxSizing: "border-box",
              gap: "0.5rem",
              display: "grid",
              gridTemplateColumns: "1fr",
              justifyContent: "center",
              gridTemplateAreas: '"title forgotButton" "form form"',
            }}
          >
            <div
              className="title"
              style={{ boxSizing: "border-box", gridArea: "title" }}
            ><b>login</b>
              
            </div>
            <form
              style={{
                boxSizing: "border-box",
                gap: "0.5rem",
                display: "grid",
                width: "100%",
                gridArea: "form",
              }}
            >
              <input
                name="current-email"
                type="email"
                autoComplete="current-email"
                placeholder="email"
                style={{
                  boxSizing: "border-box",
                  margin: "0px",
                  overflow: "visible",
                  background: "#262223",
                  border: "none",
                  borderRadius: "0.5rem",
                  outline: "none",
                  padding: "0.5em",
                  caretColor: systemTheme.text.primary,
                  color: systemTheme.text.primary,
                  fontFamily:
                    '"Roboto Mono", "Roboto Mono", "Vazirmatn", monospace',
                  fontSize: "1em",
                  lineHeight: "1.25em",
                  width: "15rem",
                }}
              />
              <input
                name="current-password"
                type="password"
                autoComplete="current-password"
                placeholder="password"
                style={{
                  boxSizing: "border-box",
                  margin: "0px",
                  overflow: "visible",
                  background: "#262223",
                  border: "none",
                  borderRadius: "0.5rem",
                  outline: "none",
                  padding: "0.5em",
                  caretColor: systemTheme.text.primary,
                  color: systemTheme.text.primary,
                  fontFamily:
                    '"Roboto Mono", "Roboto Mono", "Vazirmatn", monospace',
                  fontSize: "1em",
                  lineHeight: "1.25em",
                  width: "15rem",
                }}
              />

              <button
                className="signIn"
                type="submit"
                style={{
                  boxSizing: "border-box",
                  margin: "0px",
                  overflow: "visible",
                  textTransform: "none",
                  placeContent: "center",
                  background: "#262223",
                  border: "none",
                  borderRadius: "0.5rem",
                  gap: "0.5em",
                  padding: "0.5em",
                  transition:
                    "background 0.125s ease 0s, color 0.125s ease 0s, opacity 0.125s ease 0s",
                  alignItems: "baseline",
                  color: systemTheme.text.primary,
                  cursor: "pointer",
                  display: "inline-flex",
                  fontFamily: "inherit",
                  fontSize: "1em",
                  height: "min-content",
                  lineHeight: 1.25,
                  textAlign: "center",
                  userSelect: "none",
                  appearance: "button",
                }}
              >
                Sign In
              </button>
              <div
                style={{
                  boxSizing: "border-box",
                  fontSize: "0.75rem",
                  textAlign: "center",
                  
                }}
              >
                or
              </div>
              <button
                className="signInWithGoogle"
                style={{
                  boxSizing: "border-box",
                  margin: "0px",
                  overflow: "visible",
                  textTransform: "none",
                  placeContent: "center",
                  background: "#262223",
                  border: "none",
                  borderRadius: "0.5rem",
                  gap: "0.5em",
                  padding: "0.5em",
                  transition:
                    "background 0.125s ease 0s, color 0.125s ease 0s, opacity 0.125s ease 0s",
                  alignItems: "baseline",
                  appearance: "none",
                  color: systemTheme.text.primary,
                  cursor: "pointer",
                  display: "inline-flex",
                  fontFamily: "inherit",
                  fontSize: "1em",
                  height: "min-content",
                  lineHeight: 1.25,
                  textAlign: "center",
                  userSelect: "none",
                }}
              >
                Google Sign In
              </button>
            </form>
          </div>
        </div>
      </main>
      <style
        dangerouslySetInnerHTML={{
          __html: `
html {
  box-sizing: border-box;
  text-size-adjust: 100%;
  line-height: 1.25;
  overflow-y: scroll;
  scroll-behavior: smooth;
  font-weight: 400;
  scroll-padding-top: 2rem;
}

body {
  box-sizing: border-box;
  background: #1c1b1d;
  margin: 0px;
  padding: 0px;
  color: #f2efed;
  font-family: "Roboto Mono", "Roboto Mono", "Vazirmatn", monospace;
  min-height: 100vh;
  overflow-x: hidden;
  transition: background 0.25s ease 0s, transform 0.05s ease 0s;
  cursor: default;
}
`,
        }}
      />
    </>
  );
}

export default LoginPage;