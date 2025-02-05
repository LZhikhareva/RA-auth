import News from "./News"

export default function Account({ isLoggedIn, news, user, logout }) {
  if (!user) {
    return;
  }
  return (
    <div className='page'>
      <div className='header'>
        <p>Neto Social</p>
        <form className='auth-form' onSubmit={(e) => logout(e)}>
          <div className='header-item'>Hello, {user.name}</div>
          <img className='header-item avatar' src={user.avatar} />
          <button className="login-button" type='submit'>Logout</button>
        </form>
      </div>
      {isLoggedIn && (<News news={news} />)}
    </div>
  )
}