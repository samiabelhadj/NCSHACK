import {
  FiDownload,
  FiPlus,
  FiTrash,
  FiEdit,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { useState } from "react";

const partnersData = [
  {
    id: "PART001",
    name: "GreenTech Recycling Solutions",
    contactPerson: "Sarah Johnson",
    email: "sarah.johnson@greentech.com",
    phone: "+1 (555) 123-4567",
    address: "123 Recycling Ave, Downtown",
    type: "Recycling Partner",
    status: "Active",
    contractStart: "2023-01-15",
    contractEnd: "2024-12-31",
    services: ["Plastic Recycling", "Glass Processing", "Metal Recovery"],
  },
  {
    id: "PART002",
    name: "EcoWaste Management",
    contactPerson: "Michael Chen",
    email: "michael.chen@ecowaste.com",
    phone: "+1 (555) 234-5678",
    address: "456 Waste Management Blvd, Industrial Zone",
    type: "Waste Management",
    status: "Active",
    contractStart: "2023-03-20",
    contractEnd: "2025-03-20",
    services: ["Organic Waste", "Hazardous Waste", "General Waste"],
  },
  {
    id: "PART003",
    name: "SmartBin Technologies",
    contactPerson: "Emily Rodriguez",
    email: "emily.rodriguez@smartbin.com",
    phone: "+1 (555) 345-6789",
    address: "789 Tech Park, Innovation District",
    type: "Technology Partner",
    status: "Active",
    contractStart: "2023-06-10",
    contractEnd: "2024-06-10",
    services: ["IoT Sensors", "Smart Bins", "Monitoring Systems"],
  },
  {
    id: "PART004",
    name: "CleanCity Logistics",
    contactPerson: "David Thompson",
    email: "david.thompson@cleancity.com",
    phone: "+1 (555) 456-7890",
    address: "321 Logistics Center, Transport Hub",
    type: "Logistics Partner",
    status: "Inactive",
    contractStart: "2022-09-15",
    contractEnd: "2023-09-15",
    services: ["Collection Services", "Transportation", "Route Optimization"],
  },
  {
    id: "PART005",
    name: "Sustainable Materials Co.",
    contactPerson: "Lisa Wang",
    email: "lisa.wang@sustainable.com",
    phone: "+1 (555) 567-8901",
    address: "654 Green Street, Eco District",
    type: "Materials Partner",
    status: "Active",
    contractStart: "2023-08-01",
    contractEnd: "2025-08-01",
    services: ["Biodegradable Materials", "Composting", "Organic Processing"],
  },
];

const Partners = () => {
  const [partnersList, setPartnersList] = useState(partnersData);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
    contractStart: "",
    contractEnd: "",
    services: [],
  });
  const [search, setSearch] = useState("");
  const [editPartnerId, setEditPartnerId] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [newService, setNewService] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editPartnerId !== null) {
      // Edit mode
      setPartnersList((prevList) =>
        prevList.map((partner) =>
          partner.id === editPartnerId
            ? {
                ...partner,
                name: form.name,
                contactPerson: form.contactPerson,
                email: form.email,
                phone: form.phone,
                address: form.address,
                status: form.status,
                contractStart: form.contractStart,
                contractEnd: form.contractEnd,
                services: form.services,
              }
            : partner
        )
      );
    } else {
      // Add mode
      const newPartner = {
        id: `PART${String(partnersList.length + 1).padStart(3, "0")}`,
        name: form.name,
        contactPerson: form.contactPerson,
        email: form.email,
        phone: form.phone,
        address: form.address,
        status: form.status,
        contractStart: form.contractStart,
        contractEnd: form.contractEnd,
        services: form.services,
      };
      setPartnersList([...partnersList, newPartner]);
    }
    handleModalClose();
  };

  const handleEditClick = (partner) => {
    setForm({
      name: partner.name,
      contactPerson: partner.contactPerson,
      email: partner.email,
      phone: partner.phone,
      address: partner.address,
      status: partner.status,
      contractStart: partner.contractStart,
      contractEnd: partner.contractEnd,
      services: [...partner.services],
    });
    setEditPartnerId(partner.id);
    setShowModal(true);
  };

  const handleDeleteClick = (partnerId) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      setPartnersList((prevList) =>
        prevList.filter((partner) => partner.id !== partnerId)
      );
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setForm({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      status: "Active",
      contractStart: "",
      contractEnd: "",
      services: [],
    });
    setEditPartnerId(null);
    setNewService("");
  };

  const addService = () => {
    if (newService.trim() && !form.services.includes(newService.trim())) {
      setForm((prev) => ({
        ...prev,
        services: [...prev.services, newService.trim()],
      }));
      setNewService("");
    }
  };

  const removeService = (serviceToRemove) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service !== serviceToRemove),
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredPartners = partnersList.filter(
    (partner) =>
      partner.name.toLowerCase().includes(search.toLowerCase()) ||
      partner.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      partner.email.toLowerCase().includes(search.toLowerCase()) ||
      partner.id.toLowerCase().includes(search.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = [
      "Partner ID",
      "Name",
      "Contact Person",
      "Email",
      "Phone",
      "Address",
      "Status",
      "Contract Start",
      "Contract End",
      "Services",
    ];

    const csvContent = [
      headers.join(","),
      ...partnersList.map((partner) =>
        [
          partner.id,
          `"${partner.name}"`,
          `"${partner.contactPerson}"`,
          partner.email,
          partner.phone,
          `"${partner.address}"`,
          partner.status,
          partner.contractStart,
          partner.contractEnd,
          `"${partner.services.join("; ")}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `partners_data_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = (format) => {
    setShowExportMenu(false);
    if (format === "csv") {
      exportToCSV();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Supplier & Partner Management
        </h1>
        <div className="flex space-x-2">
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <FiPlus className="mr-2" /> Add Partner
          </button>
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <FiDownload className="mr-2" /> Export Data
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                <div className="py-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleExport("csv")}
                  >
                    Export as CSV
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close export menu */}
      {showExportMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowExportMenu(false)}
        ></div>
      )}

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full md:w-1/3 border rounded px-3 py-2"
          placeholder="Search by partner ID, name, or contact..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Partners
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {partnersList.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Active Partners
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {
              partnersList.filter((partner) => partner.status === "Active")
                .length
            }
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Contract Expiring
          </h3>
          <p className="text-2xl font-bold text-yellow-600">
            {
              partnersList.filter((partner) => {
                const endDate = new Date(partner.contractEnd);
                const today = new Date();
                const daysUntilExpiry = Math.ceil(
                  (endDate - today) / (1000 * 60 * 60 * 24)
                );
                return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
              }).length
            }
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Services
          </h3>
          <p className="text-2xl font-bold text-purple-600">
            {new Set(partnersList.flatMap((partner) => partner.services)).size}
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editPartnerId ? "Edit Partner" : "Add New Partner"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="w-full border rounded px-3 py-2"
                  type="text"
                  name="name"
                  placeholder="Company Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  type="text"
                  name="contactPerson"
                  placeholder="Contact Person"
                  value={form.contactPerson}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="w-full border rounded px-3 py-2"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  className="w-full border rounded px-3 py-2"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="w-full border rounded px-3 py-2"
                  type="date"
                  name="contractStart"
                  value={form.contractStart}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  type="date"
                  name="contractEnd"
                  value={form.contractEnd}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Services Management */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    className="flex-1 border rounded px-3 py-2"
                    type="text"
                    placeholder="Add a service"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addService())
                    }
                  />
                  <button
                    type="button"
                    onClick={addService}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {service}
                      <button
                        type="button"
                        onClick={() => removeService(service)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editPartnerId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">Company</th>
              <th className="py-2 px-4 text-left text-gray-600">Contact</th>
              <th className="py-2 px-4 text-left text-gray-600">Status</th>
              <th className="py-2 px-4 text-left text-gray-600">Contract</th>
              <th className="py-2 px-4 text-left text-gray-600">Services</th>
              <th className="py-2 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPartners.map((partner) => (
              <tr key={partner.id} className="border-t">
                <td className="py-3 px-4">
                  <div className="font-semibold">{partner.name}</div>
                  <div className="text-sm text-gray-500">{partner.address}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold">{partner.contactPerson}</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <FiMail className="mr-1" />
                    {partner.email}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <FiPhone className="mr-1" />
                    {partner.phone}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${getStatusColor(
                      partner.status
                    )}`}
                  >
                    {partner.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    <div>Start: {partner.contractStart}</div>
                    <div>End: {partner.contractEnd}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {partner.services.slice(0, 2).map((service, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700"
                      >
                        {service}
                      </span>
                    ))}
                    {partner.services.length > 2 && (
                      <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">
                        +{partner.services.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-blue-600"
                      onClick={() => handleEditClick(partner)}
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-gray-500 hover:text-red-600"
                      onClick={() => handleDeleteClick(partner.id)}
                      title="Delete"
                    >
                      <FiTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Partners;
