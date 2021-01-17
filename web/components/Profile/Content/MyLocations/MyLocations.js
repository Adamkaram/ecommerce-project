import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import * as ProfileAction from '../../../../redux/actions/ProfileAction'
import { connect } from 'react-redux'
import Loading from '../../../Loading/Loading'

class MyLocations extends Component {
  state = {
    locations: true,
    city: '',
    street: '',
    details: '',
    phone: '',
  }

  componentDidMount () {
    this.props.getAddress()
  }
  render () {
    const {
      addresses,
      addressIsLoading,
      cities,
      newLocationWindow,
      language,
    } = this.props
    const { locations, city, street, details, phone } = this.state
    return (
      <div className='my-locations'>
        <div className='head'>
          <div>
            <h3> {language == 'en' ? 'Locations' : 'العناوين'}</h3>
            <p>
              {language == 'en'
                ? 'Add, remove and select favorite addresses'
                : 'إضافة وإزالة وتحديد العناوين المفضلة '}
            </p>
          </div>
          <div>
            {newLocationWindow ? (
              <Button
                variant='light'
                onClick={() => this.props.locationWindow(false)}
              >
                {language == 'en' ? 'Back to locations' : 'رجوع للقائمة '}
              </Button>
            ) : (
              <Button
                variant='primary'
                onClick={() => this.props.locationWindow(true)}
              >
                {language == 'en' ? 'Add an address' : ' إضافة عنوان '}
              </Button>
            )}
          </div>
        </div>
        {!newLocationWindow ? (
          addressIsLoading == false && addresses.length == 0 ? (
            <div className='no-locations'>
              <h2>
                {language == 'en'
                  ? 'You have no saved addresses!'
                  : 'لا يوجد لديك أية عناوين محفوظة!'}
              </h2>
              <p>
                {language == 'en'
                  ? 'Add an address now that we can deliver orders to you.'
                  : 'أضف عنواناً الآن نتمكن من توصيل الطلبات إليك.'}
              </p>
              <Button
                variant='primary'
                onClick={() => this.props.locationWindow(true)}
              >
                {language == 'en' ? 'New Location' : 'عنوان جديد'}
              </Button>
            </div>
          ) : null
        ) : null}

        {newLocationWindow ? (
          <Form>
            <Form.Group controlId='formBasicCity'>
              <Form.Label>
                {language == 'en' ? 'the city name' : 'اسم المدينة'}
              </Form.Label>
              <Form.Control
                size='sm'
                as='select'
                name='city'
                value={this.state.city}
                onChange={e =>
                  this.setState({ [e.target.name]: e.target.value })
                }
              >
                <option value=''>
                  {' '}
                  {language == 'en' ? 'Choose a city name' : 'اختر اسم مدينة'}
                </option>
                {cities.map(city => {
                  return (
                    <option key={city._id} value={city._id}>
                      {language == 'en' ? city.nameEn : city.nameAr}
                    </option>
                  )
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='formBasicText'>
              <Form.Label>
                {language == 'en' ? 'Street name' : 'اسم الشارع'}
              </Form.Label>
              <Form.Control
                size='sm'
                type='text'
                placeholder={language == 'en' ? 'Street' : 'الشارع'}
                name='street'
                onChange={e =>
                  this.setState({ [e.target.name]: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId='formBasicNextText'>
              <Form.Label>
                {' '}
                {language == 'en' ? 'Telephone number' : 'رقم الهاتف'}
              </Form.Label>
              <Form.Control
                size='sm'
                type='text'
                placeholder={language == 'en' ? 'Telephone number' : 'الهاتف'}
                name='details'
                onChange={e =>
                  this.setState({ [e.target.name]: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlTextarea1'>
              <Form.Label>
                {language == 'en' ? 'Address details' : 'تفاصيل العنوان'}
              </Form.Label>
              <Form.Control
                size='sm'
                as='textarea'
                rows='3'
                name='phone'
                placeholder={language == 'en' ? 'details' : 'تفاصيل'}
                onChange={e =>
                  this.setState({ [e.target.name]: e.target.value })
                }
              />
            </Form.Group>
            <Button
              variant='primary'
              onClick={() =>
                this.props.addAddress(city, street, details, phone)
              }
            >
              {language == 'en' ? 'Add' : 'إضافة'}
            </Button>
          </Form>
        ) : (
          <div className='real-location'>
            {addressIsLoading ? (
              <Loading />
            ) : (
              addresses.map(items => {
                return (
                  <div className='one-location' key={items._id}>
                    <div className='header'>
                      <h5> {language == 'en' ? 'Address' : 'العنوان'}</h5>
                    </div>
                    <div className='body'>
                      <div className='sec'>
                        <div>
                          <p>
                            {language == 'en'
                              ? 'The name of the city and the street'
                              : 'اسم المدينة والشارع'}
                          </p>
                          <p>
                            {language == 'en'
                              ? items.city.nameEn
                              : items.city.nameAr}
                          </p>
                          <span>{items.street}</span>
                        </div>
                        <div>
                          <p> {language == 'en' ? 'Details' : 'التفاصيل'}</p>
                          <p>{items.details}</p>
                        </div>
                        <div>
                          <p>
                            {language == 'en'
                              ? 'Telephone number'
                              : 'رقم الهاتف '}
                          </p>
                          <p>{items.phone}</p>
                        </div>
                        {/* <div>
                        <Button variant="light">تعديل</Button>
                        <Button variant="danger">حذف</Button>
                      </div> */}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    addresses: state.profile.addresses,
    addressIsLoading: state.profile.addressIsLoading,
    cities: state.profile.cities,
    newLocationWindow: state.profile.newLocationWindow,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAddress: () => dispatch(ProfileAction.getAddress()),
    addAddress: (city, street, details, phone) =>
      dispatch(ProfileAction.addAddress(city, street, details, phone)),
    locationWindow: statue => dispatch(ProfileAction.changeStatue(statue)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyLocations)
