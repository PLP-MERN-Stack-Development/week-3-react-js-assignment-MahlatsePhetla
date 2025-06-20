
export default function Footer() {
  return (
    <footer className="text-center p-4 text-sm text-gray-500 dark:text-gray-400">
      &copy; {new Date().getFullYear()} Task Manager App
    </footer>
  );
}