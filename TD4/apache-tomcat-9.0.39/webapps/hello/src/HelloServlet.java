package fr.ub.m2.servlet;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.util.Enumeration;

@WebServlet(urlPatterns="/world")
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        String userName = getName(req);

        out.println("<html>");
        out.println("<body>");
        out.println("Hello "+userName+".");
        out.println("</body>");
        out.println("</html>");

        printHeaders(req, out);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        String content = req.getReader().readLine();
        String userName = req.getParameter("name");

        out.println("<html>");
        out.println("<body>");
        addCSS(out);
        out.println("Hello "+userName+".</br>");
        out.println("More info: </br>");
        printHeaders(req, out);
        out.println("</br>Content req: "+content+"</br>");
        out.println("</body>");
        out.println("</html>");
       
    }

    private String getName(HttpServletRequest req){

        HttpSession session = req.getSession();
        String userName = req.getParameter("name");
        if(userName == null || userName == ""){
            userName = (String) session.getAttribute("name");
        }else{
            req.getSession().setAttribute("name", userName);
        }
        return userName;
    }

    private void addCSS(PrintWriter out){
        out.println("<style> table {border-collapse: collapse;width: 100%;}th, td {padding: 0.25rem;text-align: left;border: 1px solid #ccc;}tbody tr:nth-child(odd) {background: #eee;}</style>");
    }

    private void printHeaders(HttpServletRequest req, PrintWriter out) {
        out.println("<b>Request Method: </b>" + req.getMethod() + "<br/>");
        out.println("<b>Request URI: </b>" + req.getRequestURI() + "<br/>");
        out.println("<b>Request Protocol: </b>" + req.getProtocol() + "<br/><br/>");
        out.println("<table><thead>\n");
        out.println("\t<tr>\n<th>Header Name</th><th>Header Value</th></tr>\n");
        out.println("</thead><tbody>");
        Enumeration headerNames = req.getHeaderNames();
        while(headerNames.hasMoreElements()) {
                String headerName = (String)headerNames.nextElement();
                out.println("\t<tr>\n\t\t<td>" + headerName + "</td>");
                out.println("<td>" + req.getHeader(headerName) + "</td>\n");
                out.println("\t</tr>\n");
        }
        out.println("</tbody></table>");
}
}