package fr.ub.m2.servlet;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.util.Enumeration;

public class LogoutServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        session.invalidate();
        resp.setContentType("text/html");
        ServletOutputStream out = resp.getOutputStream();
        out.println("<html><head>");
        out.println("<title>Logout</title></head>");
        out.println("<body>");
        out.println("<h1>Logout successfull.</h1>");
        out.println("</body></html>");
    }
}