import Comments from "./Components/Comments/Comments";
import Footer from "./Components/pages/Footer";
import Header from "./Components/pages/Header";
import { CommentsProvider } from "./Context/CommentsContext";

function App() {
  return (
    <CommentsProvider>
      <div className="relative w-10/12 mx-auto my-6 md:w-6/12">
        <Header />
        <Comments />
        <Footer />
      </div>
    </CommentsProvider>
  );
}

export default App;
