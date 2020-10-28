package fr.ub.m2.servlet;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.util.Enumeration;

public class MainServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String userName = (String) session.getAttribute("USER");
        if (userName != null) {
            resp.setContentType("text/html");
            ServletOutputStream out = resp.getOutputStream();
            out.println("<html><body><h1>");
            out.println("Hello, " + userName + "! ");
            out.println("</h1></body></html>");
        } else {
            resp.sendRedirect("LoginForm.html");
        }
    }
}