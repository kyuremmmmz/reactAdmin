// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigation } from "./NavigationContext";
import NavigationData from "../../data/navigation-data";
import { supabase } from "../../supabaseClient";

const SidePanel = () => {
  const { activePath, setActivePath } = useNavigation();
  const [name, setName] = useState('');
  const fetchUserData = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }

      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error("Error fetching user profile:", error);
          return;
        }

        setName(data.full_name);
      }
    } catch (error) {
      console.error("Error in fetchUserData:", error);
    }
  };
  useEffect(() => {

    fetchUserData();
  }, []);

  const handleLinkClick = (path) => {
    setActivePath(path);
  };

  return (
    <div className="bg-primary item-side-panel content-start-vertical">
      <header className="content-mid-vertical">
        <img
          src="https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D"
          alt="profile"
          className="profile-image"
          height={120}
          width={120}
        />
        <h4 className="profile-name">Welcome {name}</h4>
      </header>
      <hr />

      <main className="content-start-vertical">
        {NavigationData.map((item) =>
          item.name && item.path ? (
            <Link
              to={item.path}
              key={item._id}
              className={`side-panel-button ${activePath === item.path ? "selected-button" : ""}`}
              onClick={() => handleLinkClick(item.path)}
            >
              {item.name}
            </Link>
          ) : null
        )}
      </main>
    </div>
  );
};

export default SidePanel;
