import React from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';

const Home = () => (
  <div className="home">
    <h1 className="slogen">
      <span>😍Welcome to my playground！🤣</span>
    </h1>
    <LazyLoad height={600} debounce={false}>
      <img alt="风景1" width={"100%"} src="https://i2.chinanews.com/simg/ypt/2021/210220/131063780_zsite.jpg" />
    </LazyLoad>
    <LazyLoad height={600} debounce={false}>
      <img alt="风景3" width={"100%"} src="https://tse4-mm.cn.bing.net/th/id/OIP.ICftcZGSRP8QaHa2mkhsUQHaLH" />
    </LazyLoad>
  </div>
);

const mapStateToProps = state => ({ greetings: state.greetings });

export default connect(mapStateToProps)(Home);
