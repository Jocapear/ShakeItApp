import React,{ useState } from 'react';
import Coupon from './Coupon';
import { Button, Container } from 'semantic-ui-react'

const CouponFetcher = () => {
  const[hasCoupon,setHasCoupon] = useState(false)
  return (
    <Container>
      {hasCoupon ? <Coupon /> : (
        <Button positive compact size='massive' style={{width: 250, height: 100}} onClick={()=>{
          setHasCoupon(true)
        }}>
          Shake it!
        </Button>
      )}
    </Container>
  );
};

CouponFetcher.defaultProps = {};

export default CouponFetcher;
