export default function InfoBox({ children }) {
  return (
    <div className="mt-2">
      <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full animate-pulse"
          style={{ width: "75%" }}
        ></div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-1">{children}</p>
    </div>
  );
}
