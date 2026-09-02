import React, {
  useEffect,
  useState,
} from "react";

import AdminNavbar from "../components/AdminNavbar";

import adminService from "../services/adminService";

const AdminUsers = () => {
  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data =
        await adminService.getUsers();

      setUsers(
        Array.isArray(data)
          ? data
          : []
      );

      setError("");
    } catch (error) {
      console.error(
        "Users load failed:",
        error
      );

      setError(
        "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (
    userId,
    role
  ) => {
    if (role === "ADMIN") {
      alert(
        "Admin accounts cannot be deleted from this page."
      );

      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this user?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await adminService.deleteUser(
        userId
      );

      await loadUsers();
    } catch (error) {
      console.error(
        "Delete user failed:",
        error
      );

      alert(
        "Failed to delete user. The user may have existing orders."
      );
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container py-5">
        <div className="mb-4">
          <h2 className="fw-bold">
            User Management
          </h2>

          <p className="text-muted">
            View registered NexaBuy
            customers.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" />
          </div>
        ) : users.length === 0 ? (
          <div className="alert alert-info">
            No users found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Phone</th>

                  <th>Role</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map(
                  (user) => (
                    <tr
                      key={user.id}
                    >
                      <td>
                        {user.id}
                      </td>

                      <td>
                        {
                          user.firstName
                        }{" "}
                        {
                          user.lastName
                        }
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>
                        {user.phone ||
                          "-"}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            user.role ===
                            "ADMIN"
                              ? "bg-danger"
                              : "bg-primary"
                          }`}
                        >
                          {
                            user.role
                          }
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          disabled={
                            user.role ===
                            "ADMIN"
                          }
                          onClick={() =>
                            deleteUser(
                              user.id,
                              user.role
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminUsers;