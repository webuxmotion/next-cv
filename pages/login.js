const Login = () => {

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password" />
              </div>
              <button
                type="submit"
                className="btn btn-main bg-blue py-2 ttu">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
