import ReactDataTable from './dataTable/Table';
const columns = [
  {
    name: 'Id',
    selector: 'id',
    filterable: true,
    sortable: true,
  },
  {
    name: 'Name',
    selector: 'name',
    filterable: true,
    sortable: false,
  },
  {
    name: 'Location',
    selector: 'location',
    filterable: true,
    sortable: false,
  },
  {
    name: 'Email',
    selector: 'email',
    filterable: false,
    sortable: false,
  },
  {
    name: 'Mobile',
    selector: 'mobile',
    filterable: false,
    sortable: false,
  },
  {
    name: 'Reg Table Count',
    selector: 'reg_table_count',
    filterable: false,
    sortable: false,
  },
  {
    name: 'Plan Status',
    selector: 'plan_status',
    filterable: false,
    sortable: false,
  },
  {
    name: 'Plan Expiry',
    selector: 'plan_expiry',
    filterable: false,
    sortable: false,
  },
  {
    name: 'Plan Name',
    selector: 'plan_name',
    filterable: false,
    sortable: false,
  },
  {
    name: 'Base Url Name',
    selector: 'base_url_name',
    filterable: false,
    sortable: false,
  },
  {
    name: 'Base Color',
    selector: 'base_color',
    filterable: false,
    sortable: false,
  },
  {
    name: 'Create Date',
    selector: 'create_date',
    filterable: true,
    sortable: false,
  },
  {
    name: 'Update Date',
    selector: 'update_date',
    filterable: true,
    sortable: false,
  },
];
const actions = [
  {
    key: 'viewDetails',
    handler: (index, item) => {
      console.log(index, item);
    },
    label: 'View record',
  },
];
const temp = [
  {
    id: 1,
    name: 'gsdgs',
    location: '9876543211',
    email: 'hgfhf@fsdfs.ss',
    mobile: '9876543211',
    reg_table_count: 1,
    plan_status: null,
    plan_expiry: '2023-05-30',
    plan_name: 'sfdsf',
    base_url_name: 'fdsf',
    base_color: 'fdsfsdf',
    create_date: '5/10/2023, 5:55:04 PM',
    update_date: '5/10/2023, 5:55:04 PM',
  },
  {
    id: 2,
    name: 'gsdgs',
    location: '9876543211',
    email: 'hgfhf@fsdfs.ss',
    mobile: '9876543211',
    reg_table_count: 1,
    plan_status: null,
    plan_expiry: '2023-05-30',
    plan_name: 'sfdsf',
    base_url_name: 'fdsf',
    base_color: 'fdsfsdf',
    create_date: '5/10/2023, 5:55:42 PM',
    update_date: '5/10/2023, 5:55:42 PM',
  },
  {
    id: 3,
    name: 'gsdgs',
    location: '9876543211',
    email: 'hgfhf@fsdfs.ss',
    mobile: '9876543211',
    reg_table_count: 1,
    plan_status: null,
    plan_expiry: '2023-05-30',
    plan_name: 'sfdsf',
    base_url_name: 'fdsf',
    base_color: 'fdsfsdf',
    create_date: '5/10/2023, 6:16:45 PM',
    update_date: '5/10/2023, 6:16:45 PM',
  },
  {
    id: 4,
    name: 'gsdgs',
    location: '9876543211',
    email: 'hgfhf@fsdfs.ss',
    mobile: '9876543211',
    reg_table_count: 1,
    plan_status: null,
    plan_expiry: '2023-05-30',
    plan_name: 'sfdsf',
    base_url_name: 'fdsf',
    base_color: 'fdsfsdf',
    create_date: '5/10/2023, 6:17:48 PM',
    update_date: '5/10/2023, 6:17:48 PM',
  },
  {
    id: 5,
    name: 'gsdgs',
    location: '9876543211',
    email: 'hgfhf@fsdfs.ss',
    mobile: '9876543211',
    reg_table_count: 1,
    plan_status: null,
    plan_expiry: '2023-05-30',
    plan_name: 'sfdsf',
    base_url_name: 'fdsf',
    base_color: 'fdsfsdf',
    create_date: '5/10/2023, 6:19:13 PM',
    update_date: '5/10/2023, 6:19:13 PM',
  },
  {
    id: 6,
    name: 'dfsfgsdg',
    location: '9876543211',
    email: 'fdgdfgd@gfsgsdg.ss',
    mobile: '9876543211',
    reg_table_count: 2,
    plan_status: null,
    plan_expiry: '2023-05-17',
    plan_name: 'fgdg',
    base_url_name: 'dfgdfg',
    base_color: 'fddfgdfgd',
    create_date: '5/10/2023, 6:19:13 PM',
    update_date: '5/10/2023, 6:19:13 PM',
  },
  {
    id: 7,
    name: 'dsfsdf',
    location: 'fesfsdfdsfsdfsdf',
    email: 'sfdf@fsdfsdf.ss',
    mobile: '9876543211',
    reg_table_count: 1,
    plan_status: null,
    plan_expiry: '2023-05-25',
    plan_name: 'dfsfdsf',
    base_url_name: 'dfsdf',
    base_color: 'sdsdfsfs',
    create_date: '5/10/2023, 6:52:11 PM',
    update_date: '5/10/2023, 6:52:11 PM',
  },
  {
    id: 8,
    name: 'dsfsdfsd',
    location: 'dfsdfsdfsdfsdf',
    email: 'sdfdgdg@fgdfg.ddd',
    mobile: '9876543211',
    reg_table_count: 1,
    plan_status: null,
    plan_expiry: '2023-05-24',
    plan_name: 'dfs',
    base_url_name: 'ffdfd',
    base_color: 'dfsdfsdf',
    create_date: '5/10/2023, 6:55:17 PM',
    update_date: '5/10/2023, 6:55:17 PM',
  },
  {
    id: 9,
    name: 'dfgdfg',
    location: 'fgfdgdfgdgdfg',
    email: 'fdgdg@sfdsfdsf.ss',
    mobile: '9876543211',
    reg_table_count: 1,
    plan_status: null,
    plan_expiry: '2023-05-19',
    plan_name: '1',
    base_url_name: 'dsfsdf',
    base_color: 'dds',
    create_date: '5/10/2023, 6:57:18 PM',
    update_date: '5/10/2023, 6:57:18 PM',
  },
  {
    id: 10,
    name: 'fdsfsdfstetre',
    location: 'sdfdsfsdgdfbcvbv dsg df',
    email: 'dfgdfg@dfgdg.dd',
    mobile: '8765432111',
    reg_table_count: 1,
    plan_status: null,
    plan_expiry: '2023-05-25',
    plan_name: '1',
    base_url_name: '5',
    base_color: '2',
    create_date: '5/10/2023, 6:58:37 PM',
    update_date: '5/10/2023, 6:58:37 PM',
  },
  {
    id: 11,
    name: 'dsfsdf',
    location: 'dfsfsdfdsfsdfsdfsdf``',
    email: 'gdfgfdg@sdgsdfgsd.ss',
    mobile: '9876543211',
    reg_table_count: 2,
    plan_status: null,
    plan_expiry: '2023-05-31',
    plan_name: 'dfgh',
    base_url_name: 'fdgfhnb',
    base_color: 'fgh',
    create_date: '5/10/2023, 6:59:31 PM',
    update_date: '5/10/2023, 6:59:31 PM',
  },
  {
    id: 12,
    name: 'fsfdfsf',
    location: 'dfgdfgdfgfdgdfg',
    email: 'dfgdfgdf@sfsdf.sss',
    mobile: '9876543211',
    reg_table_count: 1,
    plan_status: null,
    plan_expiry: '2222-02-02',
    plan_name: 'dsfsd',
    base_url_name: 'dsffsdf',
    base_color: '9876543211',
    create_date: '5/10/2023, 7:00:46 PM',
    update_date: '5/10/2023, 7:00:46 PM',
  },
  {
    id: 13,
    name: 'dffdgfdsg',
    location: 'dfgdfgdfgfdgfd',
    email: 'sdfdsfsd@fdsfdsf.ss',
    mobile: '9876543211',
    reg_table_count: 1,
    plan_status: null,
    plan_expiry: '0003-03-22',
    plan_name: 'dfsdf',
    base_url_name: 'dsfsdfdsfsdf',
    base_color: 'sd',
    create_date: '5/10/2023, 7:04:28 PM',
    update_date: '5/10/2023, 7:04:28 PM',
  },
  {
    id: 14,
    name: 'dfsdf',
    location: 'sgdfgdfg rgdfgdfgd',
    email: 'dfgdfgfdg@fgdfg.ff',
    mobile: '9876543211',
    reg_table_count: 0,
    plan_status: null,
    plan_expiry: '0022-04-22',
    plan_name: 'DFDGDG',
    base_url_name: 'fdgdfgd',
    base_color: 'gfhfhfgh',
    create_date: '5/11/2023, 9:32:41 PM',
    update_date: '5/11/2023, 9:32:41 PM',
  },
];
const list = [...temp, ...temp];
const MyComponent = () => (
  <ReactDataTable
    title="Title of the table"
    columns={columns}
    list={list}
    actions={actions}
    showSerialNumber
    pagination
  />
);

export default MyComponent;
