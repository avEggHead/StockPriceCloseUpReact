import { useUser } from "../context/UserContext";

export default function HomePage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="card p-4">
        <h2>Welcome!</h2>
        <p>Please log in or register to use the Stock Lookup tool.</p>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <h2>Welcome back, {user.username}!</h2>
      <p>You can now look up stocks using the navigation above.</p>
    </div>
  );
}
