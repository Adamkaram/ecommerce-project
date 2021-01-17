import React from 'react';

// Styled-Component
import styled from 'styled-components';

import { Container, Row, Col } from 'react-bootstrap';

const Banner = styled.div`
    margin-top:150px;

    @media (max-width: 600px){ 
        margin-top:80px;
    }

    .container-fluid{
    }

    .row{
        > div{
            margin-top:15px;
            img{
                width:100%;
            }
            @media (max-width: 600px){ 
                margin-top:15px;
            }
        }
    }

    .row:last-of-type{
        
    }
`

class Banners extends React.Component {
    render(){
        return(
            <Banner>
                <Container fluid={true}>
                    <Row>
                        <Col>
                            <img src="https://k.nooncdn.com/cms/pages/20191025/ec000906164415019cbcf0fb54f96b4a/en_hp-banner-03.gif" alt="Banners"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <img src="https://k.nooncdn.com/cms/pages/20191027/f973cc63b56090f3c915c86759648522/en_banner-01.gif" alt="Banners"/>
                        </Col>
                        <Col md={6}>
                            <img src="https://k.nooncdn.com/cms/pages/20191027/6d05dd25406041314ad6b56487c4bd07/en_hp-banner_01.gif" alt="Banners"/>
                        </Col>
                    </Row>
                </Container>
            </Banner>
        )
    }
}

export default Banners;