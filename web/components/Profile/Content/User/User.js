import React from 'react'
import { Button, Form } from 'react-bootstrap'
import * as ProfileAction from '../../../../redux/actions/ProfileAction'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'

class User extends React.Component {
  state = {
    username: '',
    password: '',
    passwordIsEnabled: false,
  }

  render () {
    const { username, password, passwordIsEnabled } = this.state
    const savePassword = () => {
      this.setState({ passwordIsEnabled: !passwordIsEnabled })
      this.props.changePassword(password)
    }
    const { language } = this.props
    return (
      <div className='user-profile'>
        <div className='user-profile-header'>
          <h4>{language == 'en' ? 'Profile personly' : 'الملف الشخصي'}</h4>
          <p>
            {language == 'en'
              ? 'Manage your profile details'
              : 'إدارة تفاصيل ملفك الشخصي '}
          </p>
        </div>
        <div className='profile-card'>
          <div className='header'>
            <h5>{language == 'en' ? 'general information' : 'معلومات عامة'}</h5>
          </div>
          <div className='content'>
            <div className='new-row'>
              <Form>
                <Form.Group controlId='exampleForm.ControlInput1'>
                  <Form.Label>{language == 'en' ? 'name' : 'الأسم'}</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder={language == 'en' ? 'username' : 'الأسم'}
                    name='username'
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                </Form.Group>
                {/* <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>اللغه</Form.Label>
                  <Form.Control as="select">
                    <option>العربي</option>
                    <option>English</option>
                  </Form.Control>
                </Form.Group> */}
              </Form>
            </div>
            <div className='group-button'>
              <Button
                variant='success'
                onClick={() => this.props.saveName(username)}
              >
                {language == 'en' ? 'save' : 'حفظ'}
              </Button>
            </div>
          </div>
        </div>
        <div className='profile-card'>
          <div className='header'>
            <h5>
              {language == 'en' ? 'Security information' : 'معلومات الأمن'}
            </h5>
          </div>
          <div className='content'>
            <div className='privacy'>
              {passwordIsEnabled ? (
                <div className='grid'>
                  <Form>
                    <Form.Group controlId='exampleForm.ControlInput2'>
                      <Form.Label>
                        {language == 'en' ? 'password' : 'كلمة السر '}
                      </Form.Label>
                      <Form.Control
                        type='text'
                        placeholder={
                          language == 'en'
                            ? 'new password'
                            : 'كلمة السر الجديدة'
                        }
                        name='password'
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Form>
                </div>
              ) : (
                <div className='grid'>
                  <label>{language == 'en' ? 'password' : 'كلمة السر '}</label>
                  <p>********</p>
                </div>
              )}
              <div>
                {passwordIsEnabled ? (
                  <Button variant='primary' onClick={() => savePassword()}>
                    {language == 'en' ? 'save' : 'حفظ'}
                  </Button>
                ) : (
                  <Button
                    variant='primary'
                    onClick={this.setState({
                      passwordIsEnabled: !passwordIsEnabled,
                    })}
                  >
                    {language == 'en' ? 'change' : 'تغيير'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveName: username => dispatch(ProfileAction.changeName(username)),
    changePassword: password => dispatch(ProfileAction.changePass(password)),
  }
}
export default connect(null, mapDispatchToProps)(User)
