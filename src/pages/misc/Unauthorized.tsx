export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Unauthorized</h1>
      <p className="text-lg">You do not have permission to access this page.</p>
    </div>
  );
}