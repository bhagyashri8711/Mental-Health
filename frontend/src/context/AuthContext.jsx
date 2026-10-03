import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check if demo user is saved in localStorage
    const demo = localStorage.getItem("mindconnect_demo_user");
    return demo ? JSON.parse(demo) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
        }
      } catch {
        // Fallback to local session
      } finally {
        setLoading(false);
      }
    }

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const loginAsDemo = (demoRole = "Member") => {
    const demoUser = {
      id: "demo_user_123",
      email: demoRole === "Admin" ? "admin@mindconnect.org" : demoRole === "Peer Listener" ? "listener.elena@mindconnect.org" : "alex.demo@mindconnect.org",
      user_metadata: {
        full_name: demoRole === "Admin" ? "Admin Supervisor" : demoRole === "Peer Listener" ? "Elena Rostova (Listener)" : "Alex Morgan",
        role: demoRole,
      },
    };
    localStorage.setItem("mindconnect_demo_user", JSON.stringify(demoUser));
    setUser(demoUser);
    return demoUser;
  };

  const logoutDemo = async () => {
    localStorage.removeItem("mindconnect_demo_user");
    try {
      await supabase.auth.signOut();
    } catch {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAsDemo, logoutDemo }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);