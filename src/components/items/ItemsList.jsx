import { Pencil, Trash2 } from "lucide-react";

export default function ItemsList({ items }) {
  return (
    <div className="table-responsive mt-4">
      <table className="table table-hover table-transparent align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Min</th>
            <th>Supplier</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.min_quantity}</td>
              <td>{item.supplier_name || "-"}</td>
              <td>${item.price}</td>
              <td>
                <button className="btn btn-outline-info btn-sm">
                  <Pencil size={16} />
                </button>
                <button className="btn btn-outline-danger btn-sm ms-2">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
