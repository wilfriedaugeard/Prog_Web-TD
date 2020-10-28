package fr.ub.m2.servlet;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.util.Enumeration;

@WebServlet(urlPatterns = "/LoginServlet")
public class LoginServlet extends HttpServlet {
    

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String username = req.getParameter("username");
        String password = req.getParameter("password");
        if (isLoginValid(username, password)) {
            HttpSession session = req.getSession();
            session.setAttribute("USER", username);
            resp.sendRedirect("MainServlet");
        } else {
            resp.sendRedirect("InvalidLogin.html");
        }
    }

}