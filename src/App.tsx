import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import ReactPlaceholder from 'react-placeholder';
import { RectShape, RoundShape } from 'react-placeholder/lib/placeholders';
import TopMenu from './components/TopMenu';
import Home from './components/Home';
import About from './components/About';
// import Charts from './components/Charts.jsx';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

const ChartPlaceholder = (
    <div style={{ padding: 16 }}>
      <RoundShape style={{ margin: '0 auto', width: 400, height: 26 }} color="#ddd" />
      <RectShape style={{ height: 300, marginTop: 20 }} color="#ddd" />
    </div>
);

const Chart = Loadable({
  loader: () => import(/* webpackChunkName:'chart' */'./routes/Chart'),
  // eslint-disable-next-line react/no-children-prop
  loading: () => <ReactPlaceholder customPlaceholder={ChartPlaceholder} ready={false} children={false} />,
});

const Todo = Loadable({
    loader: () => import(/* webpackChunkName:'todo' */'./routes/Todo/TodoApp'),
    loading: () => <img src="./logo192.png" className="init-loading" alt="加载中" />,
});

const Editor = Loadable({
    loader: () => import(/* webpackChunkName:'editor' */'./routes/Editor'),
    loading: () => <img src="./logo192.png" className="init-loading" alt="加载中" />,
});

const App = () => (
    <Router>
        <ErrorBoundary>
            <div className="f-dfc">
                <TopMenu />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/todo" component={Todo} />
                    <Route path="/chart" component={Chart} />
                    <Route path="/editor" component={Editor} />
                    <Route path="/about" component={About} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        </ErrorBoundary>
    </Router>
);

export default App;
