export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-4 gap-6">
        <div>
          <h3 className="text-white text-lg font-bold mb-3">💊 MedShop</h3>
          <p className="text-sm">Your trusted online pharmacy.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Policies</h4>
          <ul className="space-y-1 text-sm">
            <li>Privacy</li>
            <li>Terms</li>
            <li>Returns</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm">support@medshop.com</p>
          <p className="text-sm">+91 98765 43210</p>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-sm">
        © 2026 MedShop. Educational project.
      </div>
    </footer>
  );
}
