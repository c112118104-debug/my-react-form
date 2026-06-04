import pic1 from './IMG/1.jpg';
import pic2 from './IMG/2.jpg';
import pic3 from './IMG/3.jpg';

export function Profile1() {
  return (
    <img src={pic1} alt="不知道1" width="150" height="150" />
  );
}

export function Profile2() {
  return (
    <img src={pic2} alt="不知道2" width="150" height="150" />
  );
}

export function Profile3() {
  return (
    <img src={pic3} alt="不知道3" width="200" height="150" />
  );
}

export default function Gallery2() {
  return (
    <section>
      <h1>不知道不知道</h1>
      <Profile1 />
      <Profile2 />
      <Profile3 />
    </section>
  );
}