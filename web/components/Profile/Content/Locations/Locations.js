import React from "react";
import GoogleMapReact from "google-map-react";
import { Button, InputGroup, FormControl, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class Locations extends React.Component {
  state = {
    mapLocation: true
  };

  changeState = () => {
    this.setState({
      mapLocation: !this.state.mapLocation
    });
  };

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  render() {
    return (
      <div className="location">
        {this.state.mapLocation === true ? (
          <div className="map-section">
            <div className="map-search">
              <input type="text" placeholder="بحث عن موقعك" />
              <div className="search-result">
                <ul>
                  <li>خهش ستي هخ شسي</li>
                  <li>خهش ستي هخ شسي</li>
                  <li>خهش ستي هخ شسي</li>
                  <li>خهش ستي هخ شسي</li>
                  <li>خهش ستي هخ شسي</li>
                </ul>
              </div>
            </div>
            <div className="map">
              <div style={{ height: "400px", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyA0lckWAYUCpI0n4lCFv-smqqCOjqz7zS0"
                  }}
                  defaultCenter={this.props.center}
                  defaultZoom={this.props.zoom}
                >
                  <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                  />
                </GoogleMapReact>
              </div>
            </div>
            <div className="map-button">
              <Button variant="primary" onClick={() => this.changeState()}>
                تأكيد الموقع
              </Button>
            </div>
          </div>
        ) : (
          <div className="about-location">
            <div className="head" onClick={() => this.changeState()}>
              <p>
                <FontAwesomeIcon icon={faArrowRight} /> عوده الي الخريطة
              </p>
            </div>
            <div className="about-location-content">
              <div className="header">
                <h6>إضافة عنوان جديد</h6>
                <div>
                  <input type="checkbox" />
                  <p>تعيين كعنوان افتراضي</p>
                </div>
              </div>
              <div className="center">
                <div className="right">
                  <h6>معلومات الموقع</h6>
                  <div className="more-details">
                    <div className="edit-location">
                      <div className="data">
                        <div>
                          <FontAwesomeIcon icon={faMapMarkerAlt} />
                          <p>تعيين من الخريطة</p>
                        </div>
                        <p className="location-name">
                          125 - يوسف السباعي - السيدة زينب - محافظة القاهرة‬
                          القاهرة
                        </p>
                      </div>
                      <div
                        className="mini-map"
                        onClick={() => this.changeState()}
                      >
                        <img src="https://maps.googleapis.com/maps/api/staticmap?center=30.0282254,31.2375842&zoom=15&size=300x300&markers=30.0282254,31.2375842&key=AIzaSyCj-3GCNlMaBlaotE6sdn7cRyf0TPvkta4&signature=dHw1sZqPBXwBLZ-poSJskT-DycQ" />
                        <p>تعديل</p>
                      </div>
                    </div>
                    <div className="add-more-details">
                      <input
                        type="text"
                        placeholder="أضف رقم الشقة أو أقرب معلم رئيسي أو ما إلى ذلك"
                      />
                    </div>
                    <div className="add-work">
                      <div>
                        <p>تسمية العنوان</p>
                        <span>(اختياري)</span>
                      </div>
                      <form>
                        <div>
                          <label>المنزل</label>
                          <input type="radio" />
                        </div>
                        <div>
                          <label>العمل</label>
                          <input type="radio" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="left">
                  <h6>معلومات شخصية</h6>
                  <div>
                    <Form.Label>رقم الهاتف</Form.Label>
                    <InputGroup size="sm" className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          +20
                        </InputGroup.Text>
                      </InputGroup.Prepend>

                      <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                      />
                    </InputGroup>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>الأسم الأول</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        defaultValue="عمر عاطف"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>اسم العائله</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        defaultValue="عمر عاطف"
                      />
                    </Form.Group>
                    <div className="button-save">
                      <Button variant="primary">حفظ العنوان</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Locations;
