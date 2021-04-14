import React from 'react';
import { connect } from 'react-redux';
import scriptjs from 'scriptjs';
import ReactHighcharts from 'react-highcharts';
import PropTypes from 'prop-types';
import { getData, clearData } from './actions';


// @ts-ignore
const config = {
  chart: {
    type: 'area',
    color: [],
  },
  title: {
    text: '全球各大洲人口增长历史及预测', // 多语言平台无词条
  },
  credits: {
    enabled: false,
  },
  subtitle: {
    text: '数据来源: Wikipedia.org',
  },
  xAxis: {
    categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
    tickmarkPlacement: 'on',
    title: {
      enabled: false,
    },
  },
  yAxis: {
    title: {
      text: '十亿',
    },
    labels: {
      // @ts-ignore
      formatter() {
        // @ts-ignore
        return this.value / 1000;
      },
    },
  },
  tooltip: {
    split: true,
    valueSuffix: '百万',
  },
  plotOptions: {
    area: {
      stacking: 'normal',
      lineColor: '#666666',
      lineWidth: 1,
      marker: {
        lineWidth: 1,
        lineColor: '#666666',
      },
    },
  },
  series: [],
};

class Index extends React.Component {
  componentDidMount() {
    // @ts-ignore
    this.props.init();

    // 动态加载三方JS代码
    scriptjs(['https://cdn.bootcdn.net/ajax/libs/highcharts/9.0.1/highcharts.js'], () => {
      const { Highcharts } = window;
      // 初始化代码
      Highcharts.setOptions({
        colors: [
          '#F7C176',
          '#F19491',
          '#82CAA9',
          '#86BFF2',
          '#76CBD7',
          '#B9A5DE',
          '#C3CED3',
        ],
      });
    });
  }

  UNSAFE_componentWillMount () {
    // @ts-ignore
    this.props.clear();
  }

  render() {
    // @ts-ignore
    const { data } = this.props;
    config.series = data && data.data;
    return (
      <div>
        {/*// @ts-ignore */}
        <ReactHighcharts config={config} />
      </div>
    );
  }
}

// @ts-ignore
Index.propTypes = {
  data: PropTypes.object,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};
// @ts-ignore
Index.defaultProps = {
  data: {},
};
// @ts-ignore

const mapStateToProps = state => ({
  data: state.chart.data,
});
// @ts-ignore

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(getData());
  },
  clear: () => {
    dispatch(clearData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
