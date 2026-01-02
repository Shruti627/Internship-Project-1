export default function Toast({ type, message }) {
  const styles =
    type === "error"
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";

  return (
    <div className={`px-4 py-3 rounded-lg shadow ${styles}`}>
      {message}
    </div>
  );
}
