import { Col, Row, Card, Button } from "antd";
import React from "react";
import { EnvironmentOutlined } from '@ant-design/icons';


const Cards = ({ logo }) => {
  return (
<div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>

      <Card style={{ width: '100%', padding: '10px' }}>
        <Row align="middle" gutter={16}>
          {/* Image à gauche */}
          <Col xs={24} sm={8} md={6}>
            <img
              src={`${process.env.NEXT_PUBLIC_API_KEY}${logo.logo}`}
              alt={logo.nom}
              style={{
                objectFit: 'contain',
                width: '200px',
                height: 'auto',
                padding: '5px',
              }}
            />
          </Col>

          

          {/* Description à droite */}
          <Col xs={24} sm={16} md={18}>
            <h5 style={{ fontSize: '1.25rem', margin: 0 }}>{logo.nom}</h5>
            <p style={{ margin: '8px 0', color: '#8c8c8c' }}>{logo.adresse}</p>
            <p style={{ margin: '8px 0', color: '#8c8c8c' }}>{logo.telephone}</p>
            <Button
              type="primary"
              href={logo.location}
              icon={<EnvironmentOutlined style={{ color: 'white' }} />}
              style={{
                backgroundColor: '#D47E00', // Set background color
                color: '#fff',               // Set text color
                borderColor: '#D47E00'       // Set border color
              }}
            >
              Voir sur la map
            </Button>
          </Col>
        </Row>
      </Card>

      {/* <div className="card" style={{ width: "18rem" }}>
        <img
          src={`${process.env.NEXT_PUBLIC_API_KEY}${logo.logo}`}
          className="card-img-top"
          alt={logo.nom}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
            padding: "5px",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{logo.nom}</h5>
          <p className="card-text">{logo.adresse}</p>
          <p className="card-text">
            <small className="text-body-secondary">{logo.telephone}</small>
          </p>
          <a href={logo.location} className="btn btn-primary">
            Voir sur la map <i className="fa-solid fa-location-dot" style={{ color: "#D47E00" }}></i>
          </a>
        </div>
      </div> */}
  </div>

  );
};

export default Cards;
