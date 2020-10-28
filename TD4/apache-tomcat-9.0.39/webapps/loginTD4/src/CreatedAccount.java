package fr.ub.m2.servlet;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.util.Enumeration;
import java.util.HashMap;

@WebServlet(urlPatterns = "/createdAccount")
public class CreatedAccount extends HttpServlet {
    static HashMap <String, String> accounts = new HashMap<>();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();

        String username = req.getParameter("username");
        String password = req.getParameter("password");
        
        accounts.put(username, password);

        out.println("<html>");
        out.println("<body>");
        out.println("Hello "+username+"<br>Votre compte a bien été créé. Votre mot de passe: "+password);
        out.println("</body>");
        out.println("</html>");
    }

    protected boolean isLoginValid(String username, String password){
        return accounts.get(username) == password;
    } 

}