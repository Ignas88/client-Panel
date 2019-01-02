import React, {Component} from 'react';
import  { Link } from "react-router-dom";

class Clients extends Component {
  render() {
    const clients = [{
      id: '4567987153',
      firstName: "Kevin",
      lastName: "Love",
      email: 'klove@gmail.com',
      phone: '111-111-11111',
      balance: '30'
    },
      {
        id: '897642134',
        firstName: "Bob",
        lastName: "Dylan",
        email: 'bdylan@gmail.com',
        phone: '222-222-22222',
        balance: '400.58'
      }
    ];

    if (clients){
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {' '}<i className="fas fa-users"></i> Clients{' '}
              </h2>
            </div>
            <div className="col-md-6">

            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.firstName} {client.lastName}</td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link to={`/client/${client.id}`} className="btn btn-secondary btn-sm">
                      <i className="fas fa-arrow-circle-right"></i> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <h1>Loading..</h1>
    }
  }
}

export default Clients;