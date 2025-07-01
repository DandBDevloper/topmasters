const MenuItems = () => {
  const menuItems = [
    { id: 1, title: "Projects", url: "/projects" },
    { id: 6, title: "Blog", url: "/blogs" },
    // { id: 7, title: "Villa" },
    // { id: 3, title: "Houses" },
    // { id: 5, title: "Office" },
  ];

  return (
    <ul className="navbar-nav">
      {menuItems.map((item) => (
        <li className="nav-item" key={item.id}>
          <a className="nav-link" href={item.url} role="button">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
