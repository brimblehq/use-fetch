import useFetch from "./hooks/useFetch";
import logo from "./logo.svg";

function App() {
  const { error, data, revalidate } = useFetch({
    url: "https://random-data-api.com/api/users/random_user?size=5",
    revalidate: true,
    interval: 3,
  });

  if (!data) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error fetching users</h2>;
  }

  return (
    <div className="App">
      <img src={logo} alt="react logo" />
      <h1 className="title">useFetch()</h1>
      <button onClick={revalidate}>revalidate</button>
      <div className="items">
        {data.map((el: any) => (
          <div className="item" key={el.uid}>
            <img
              src={`https://avatars.dicebear.com/api/big-smile/${el.first_name}.svg`}
              alt={`${el.username} profile`}
              className="item__img"
            />
            <div className="item__info">
              <p className="name">
                {el.first_name} {el.last_name}{" "}
                <span className="username">(@{el.username})</span>
              </p>
              <p className="job">{el.employment.title}</p>
              <p
                className={`status ${
                  el.subscription.status.toLowerCase() === "active"
                    ? "success"
                    : el.subscription.status.toLowerCase() === "blocked"
                    ? "danger"
                    : "warn"
                }`}
              >
                {el.subscription.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
