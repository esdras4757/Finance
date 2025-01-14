import React from 'react'
import { ReactNode } from 'react';
import {isEmpty, isNil} from 'lodash';
import { Result, Skeleton, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
interface ConditionalRenderingProps {
  children: ReactNode;
  isLoading?: boolean;
  isErrored?: boolean;
  data?: any;
}

const ConditionalRendering = ( props: ConditionalRenderingProps ) => {
    const { children, isLoading, data } = props;

    if (isNil(data) && isLoading) {
        return <Spin 
        indicator={<LoadingOutlined spin />}
            style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }} size="large" />;
      }

      if (!isNil(data) && isEmpty(data) && !isLoading) {
        return <Result
        style={{color: 'white'}}
        title={<span className='text-white'>¡Ups!</span>}
        subTitle={<span className='text-white'>No hay datos para mostrar. Agrega información para comenzar.</span>}
      />;
      }
    
      if (isNil(data) && !isLoading) {
        return <Result
        style={{color: 'white'}}
        status="404"
        title={<span className='text-white'>404</span>}
        subTitle={<span className='text-white'> Ah ocurrido un error intentalo mas tarde</span>}
      />
      }


    
        if (!isNil(data) && !isLoading && children) {
            return <>{children}</>;
        }
}

export default ConditionalRendering