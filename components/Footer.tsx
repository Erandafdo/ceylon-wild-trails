export default function Footer() {
  return (
    <footer className="bg-green-900 text-white text-center py-8 mt-16">
      <p className="font-medium">
        © {new Date().getFullYear()} Ceylon Wild Trails
      </p>
      <p className="text-sm opacity-80 mt-1">
        Explore • Protect • Inspire
      </p>
    </footer>
  );
}
