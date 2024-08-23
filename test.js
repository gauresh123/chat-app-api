const data = [
  { field: "Name", val: "Gauresh" },
  { field: "Age", val: "24" },
  { field: "Name", val: "Aniket" },
  { field: "Age", val: "24" },
];

const newData = [
  {
    field_name: "Full Name",
    form_id: "22ecb68d-b530-4740-bafb-881c7e397953",
    isrequired: true,
    field_val: "Gauresh",
    created_at: "2024-04-12T08:17:27.411Z",
  },
  {
    field_name: "Company Name",
    form_id: "22ecb68d-b530-4740-bafb-881c7e397953",
    isrequired: true,
    field_val: "Sogo",
    created_at: "2024-04-12T08:17:27.411Z",
  },
  {
    field_name: "Email Id",
    form_id: "22ecb68d-b530-4740-bafb-881c7e397953",
    isrequired: true,
    field_val: "gauresh@thesogo.com",
    created_at: "2024-04-12T08:17:27.411Z",
  },
  {
    field_name: "Mobile Number",
    form_id: "22ecb68d-b530-4740-bafb-881c7e397953",
    isrequired: true,
    field_val: "9876543210",
    created_at: "2024-04-12T08:17:27.411Z",
  },
  {
    field_name: "Full Name",
    form_id: "22ecb68d-b530-4740-bafb-881c7e397953",
    isrequired: true,
    field_val: "Test",
    created_at: "2024-04-12T08:17:27.411Z",
  },
  {
    field_name: "Company Name",
    form_id: "22ecb68d-b530-4740-bafb-881c7e397953",
    isrequired: true,
    field_val: "Testing",
    created_at: "2024-04-12T08:17:27.411Z",
  },
  {
    field_name: "Email Id",
    form_id: "22ecb68d-b530-4740-bafb-881c7e397953",
    isrequired: true,
    field_val: "test@gmail.com",
    created_at: "2024-04-12T08:17:27.411Z",
  },
  {
    field_name: "Mobile Number",
    form_id: "22ecb68d-b530-4740-bafb-881c7e397953",
    isrequired: true,
    field_val: "9999911111",
    created_at: "2024-04-12T08:17:27.411Z",
  },
];

// Get unique field values for table headings
const uniqueFields = Array.from(
  new Set(newData.map((item) => item.field_name))
);

console.log(uniqueFields);
