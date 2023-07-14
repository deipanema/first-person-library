import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BookSlider from '../components/BookSlider';
import CommonComments from '../components/Comment/CommonComments';

const Home = () => {
  //const navigate = useNavigate();
  //navigate(`/my`);

  const location = useLocation();
  const { pathname } = location;
  const isHomePage = pathname === '/';
  const isComments = pathname === '/my';
  const { title } = useParams();
  console.log(title);
  console.log(pathname);

  return (
    <main className="w-full mx-auto lg:w-5/6 md:px-4 p-6">
      {!title && !isComments && <BookSlider />}
      <CommonComments />
    </main>
  );
};

export default Home;
