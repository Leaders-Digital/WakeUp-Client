import { Col, Row, Card, Button } from "antd";
import React from "react";
import { EnvironmentOutlined } from '@ant-design/icons';
import { SectionTitle } from "../../../components/shared/SectionTitle/SectionTitle";



const Cards = ({ logo }) => {
  return (
     <div style={{ marginTop: "30px" }}>
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>

     
        <SectionTitle
          subTitle="Nos Partenaires"
          title="Partenaires de Confiance"
          body="Découvrez nos partenaires de confiance qui partagent notre engagement pour des produits éthiques et durables."
        />

        <Row gutter={[16, 16]}>

          <Col xs={24} xl={12}>
            <Card style={{ width: '100%', padding: '10px', backgroundColor: '#FCEDEA', }}>
              <Row align="middle" gutter={16}>

                <Col xs={24} sm={8} md={8}>
                  <img
                    src="../../../assets/img/1.png"
                    style={{
                      objectFit: 'contain',
                      width: '200px',
                      height: 'auto',
                      padding: '5px',
                    }}
                  />
                </Col>

                <Col xs={24} sm={16} md={16}>
                  <h5 style={{ fontSize: '1.25rem', margin: 0, }}>Mihoub - Ennasr</h5>
                  <p style={{ margin: '8px 0', }}>Avenue Hédi Nouira 2001 Cité Ennasr, Ariana</p>
                  <p style={{ margin: '8px 0', }}>70 852 172</p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} xl={12}>
            <Card style={{ width: '100%', padding: '10px', backgroundColor: '#FCEDEA', }}>
              <Row align="middle" gutter={16}>

                <Col xs={24} sm={8} md={8}>
                  <img
                    src="../../../assets/img/1.png"
                    style={{
                      objectFit: 'contain',
                      width: '200px',
                      height: 'auto',
                      padding: '5px',
                    }}
                  />
                </Col>

                <Col xs={24} sm={16} md={16}>
                  <h5 style={{ fontSize: '1.25rem', margin: 0, }}>Mihoub -  L'Aouina</h5>
                  <p style={{ margin: '8px 0', }}>Avenue Mongi Slim l'Aouina 2045 Cité Taieb M'hiri</p>
                  <p style={{ margin: '8px 0', }}>71 761 348</p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} xl={12}>
            <Card style={{ width: '100%', padding: '10px', backgroundColor: '#FCEDEA', }}>
              <Row align="middle" gutter={16}>

                <Col xs={24} sm={8} md={8}>
                  <img
                    src="../../../assets/img/cleo.png"
                    style={{
                      objectFit: 'contain',
                      width: '200px',
                      height: 'auto',
                      padding: '5px',
                    }}
                  />
                </Col>

                <Col xs={24} sm={16} md={16}>
                  <h5 style={{ fontSize: '1.25rem', margin: 0, }}>Cléopâtre</h5>
                  <p style={{ margin: '8px 0', }}>Avenue Habib Bourguiba، Ez Zahra</p>
                  <p style={{ margin: '8px 0', }}>22 207 115</p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} xl={12}>
            <Card style={{ width: '100%', padding: '10px', backgroundColor: '#FCEDEA', }}>
              <Row align="middle" gutter={16}>

                <Col xs={24} sm={8} md={8}>
                  <img
                    src="../../../assets/img/petale.png"
                    style={{
                      objectFit: 'contain',
                      width: '200px',
                      height: 'auto',
                      padding: '5px',
                    }}
                  />
                </Col>

                <Col xs={24} sm={16} md={16}>
                  <h5 style={{ fontSize: '1.25rem', margin: 0, }}>Pétale</h5>
                  <p style={{ margin: '8px 0', }}>Rue du Lac Huron, Les Berges du Lac I</p>
                  <p style={{ margin: '8px 0', }}>22 207 115</p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} xl={12}>
            <Card style={{ width: '100%', padding: '10px', backgroundColor: '#FCEDEA', }}>
              <Row align="middle" gutter={16}>

                <Col xs={24} sm={8} md={8}>
                  <img
                    src="../../../assets/img/anna.png"
                    style={{
                      objectFit: 'contain',
                      width: '200px',
                      height: 'auto',
                      padding: '5px',
                    }}
                  />
                </Col>

                <Col xs={24} sm={16} md={16}>
                  <h5 style={{ fontSize: '1.25rem', margin: 0, }}>Anna Cosmétique</h5>
                  <p style={{ margin: '8px 0', }}>Centre Urbain Nord, 1082, Ariana</p>
                  <p style={{ margin: '8px 0', }}>26 644 400</p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} xl={12}>
            <Card style={{ width: '100%', padding: '10px', backgroundColor: '#FCEDEA', }}>
              <Row align="middle" gutter={16}>

                <Col xs={24} sm={8} md={8}>
                  <img
                    src="../../../assets/img/flora.png"
                    style={{
                      objectFit: 'contain',
                      width: '200px',
                      height: 'auto',
                      padding: '5px',
                    }}
                  />
                </Col>

                <Col xs={24} sm={16} md={16}>
                  <h5 style={{ fontSize: '1.25rem', margin: 0, }}>Flora</h5>
                  <p style={{ margin: '8px 0', }}>Hammamet Nord, 8050 Nabeul</p>
                  <p style={{ margin: '8px 0', }}>21 796 236</p>
                </Col>
              </Row>
            </Card>
          </Col>


        </Row>
      </div>
    </div>

  );
};

export default Cards;
