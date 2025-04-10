import ReactIcon from './assets/react_icon.png';
import JsIcon from './assets/js_icon.png';
import MonitorIcon from './assets/monitor_icon.png';
import LightBulb from './assets/light_bulb_icon.png';

export const CORE_CONCEPTS = [
  {
    image: ReactIcon,
    title: 'React',
    description: '재사용 가능한 컴포넌트 기반 개발에 익숙하며, 훅과 상태 관리를 능숙하게 사용합니다.'
  },
  {
    image: JsIcon,
    title: 'JavaScript',
    description: '비동기 처리, 모듈화, 최신 문법을 적극적으로 활용하여 효율적인 코드 작성을 지향합니다.'
  },
  {
    image: MonitorIcon,
    title: 'UI/UX',
    description: 'Figma로 디자인 협업 가능하며, CSS/SCSS로 반응형 UI 구현이 가능합니다.'
  },
  {
    image: LightBulb,
    title: '문제 해결력',
    description: '에러 디버깅, 콘솔 로그 분석, 네트워크 모니터링을 통한 빠른 원인 분석이 가능합니다.'
  }
];

export const EXAMPLES = {
  career: {
    title: 'React',
    description:
      'Components are the building blocks of React applications. A component is a self-contained module (HTML + optional CSS + JS) that renders some output.',
    code: `
function Welcome() {
  return <h1>Hello, World!</h1>;
}`,
  },
  projects: {
    title: 'JavaScript',
    description:
      'JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript (e.g., it may output dynamic content).',
    code: `
<div>
  <h1>Welcome {userName}</h1>
  <p>Time to learn React!</p>
</div>`,
  },
  skills: {
    title: 'UI/UX',
    description:
      'Components accept arbitrary inputs called props. They are like function arguments.',
    code: `
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
  },
  education: {
    title: '문제 해결력',
    description:
      'State allows React components to change their output over time in response to user actions, network responses, and anything else.',
    code: `
function Counter() {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    setIsVisible(true);
  }

  return (
    <div>
      <button onClick={handleClick}>Show Details</button>
      {isVisible && <p>Amazing details!</p>}
    </div>
  );
}`,
  },
};
