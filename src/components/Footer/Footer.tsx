import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} To-Do App. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
