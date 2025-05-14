const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); // Ensure this is required
const app = express();
const ejsmate = require('ejs-mate'); // Ensure this is required
const method = require('method-override'); // Ensure this is required
const { name } = require('ejs');
const port = 9090;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts); // Use express-ejs-layouts middleware
app.use(method('_method')); // Use method-override middleware




app.set('views', path.join(__dirname, 'views'));
// Set EJS as the templating engine and configure the layout
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set views directory
app.set('layout', 'layout/boilerplate');
app.engine('ejs', ejsmate);
// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Dashboard' });
});

app.get('/home', (req, res) => {
    res.render('home', { title: 'Home' });
});

// inventry routes

const device = [];
app.post('/add', (req, res) => {
    const { id, name, serialNumber, price } = req.body;
    const newDevice = {
        id:id,
        name:name,
        serialNumber:serialNumber,
        price:price
    };
    device.push(newDevice);
   res.redirect("/all");
});

 


app.get('/all', (req, res) => {
    res.render('inventry/all', { title: 'All Devices', device }); // ✅ Pass the array
});

app.get('/sold', (req, res) => {
    res.render('inventry/sold', { title: 'About' });
});
app.get('/report', (req, res) => {
    res.render('inventry/report', { title: 'About' });
});
app.get('/add', (req, res) => {
    res.render('inventry/add', { title: 'About' });
});



// Clients Routes
const clients = [];

app.get('/newClient', (req, res) => {
  res.render('clients/newClient', { title: 'Add New Client' });
});

app.post('/newClient', (req, res) => {
  const newClient = {
    id: req.body.clientId,
    name: req.body.clientName,
    phone: req.body.phoneNumber,
    device: req.body.device,
    paymentMethod: req.body.paymentMethod,
    paymentStatus: req.body.paymentStatus,
    note: req.body.note || '',
    address: req.body.address || 'Not Provided',
    email: req.body.email || 'Not Provided'
  };

  clients.push(newClient);
  res.redirect('/allClients');
});

app.get('/allClients', (req, res) => {
  res.render('clients/allClients', {
    title: 'All Clients',clients: clients});
});

app.get('/newClient', (req, res) => {
    res.render('clients/newClient', { title: 'About' });
});

app.get('/debtLedger', (req, res) => {
    res.render('clients/debtLedger', { title: 'About' });
});
app.get('/editClient', (req, res) => {
    res.render('clients/editClient', { title: 'About' });
});




//  wholesalers routes
const wholesalers = [];

app.post('/newWholesaler', (req, res) => {
    const  { wholesalerId, companyName, contactPerson, phoneNumber, email, address, productsSupplied, balance, status, notes } = req.body;
    const newWholesaler = {
        wholesalerId: wholesalerId,
        companyName: companyName,
        contactPerson: contactPerson,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        productsSupplied: productsSupplied,
        balance: balance,
        status: status,
        notes: notes
    };
    wholesalers.push(newWholesaler);
    res.redirect("/allWholesalers");
});
app.get('/allWholesalers', (req, res) => {
    res.render('wholesalers/allWholesalers', { 
        title: 'All Wholesalers',
        wholesalers: wholesalers  // ✅ passing data to the EJS file
    });
});

app.get('/newWholesaler', (req, res) => {
    res.render('wholesalers/newWholesaler', { title: 'About' });
});
app.get('/editWholesaler', (req, res) => {
    res.render('wholesalers/editWholesaler', { title: 'About' });
});










// Staff Routes

const staff = [];
app.get('/allStaff', (req, res) => {
    res.render('staff/allStaff', { title: 'About', staffList: staff });

});
app.get('/newStaff', (req, res) => {
    res.render('staff/newStaff', { title: 'About' });
});
app.post('/newStaff', (req, res) => {
    const { id, name, jobTitle, address, email, salary, phone, hireDate } = req.body;
    const newStaff = {
        id:id,
        name:name,
        jobTitle:jobTitle,
        address:address,
        email:email,
        salary:salary,
        phone:phone,
        hireDate:hireDate
    };
    staff.push(newStaff);
   res.redirect("/allStaff");
});
app.get('/editStaff', (req, res) => {
    res.render('staff/editStaff', { title: 'About' });
});



// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



