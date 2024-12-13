# WareWolf
The Project provides a web-interface (with Back-End Support) for a board game called ware-wolf.

# Version History
v1.0 Admin Pannel is implemented via GET Request for retreiving JSON Data from DB

v1.1 Admin Pannel uses POST Request Promises Mechanism (fetch web API) to retreive data from DB


v1.2 Admin Can Fetch The number of Players Select the Roles based on the Number of Players and then shuffle/Assign The roles 


# Setting Up a WebSocket Server

This guide explains how to set up a WebSocket server on your system and ensure it runs continuously, even after logging out or rebooting.



1. **Create a Directory for Your WebSocket Server:**

   ```bash
   mkdir ~/websocket-server
   cd ~/websocket-server

2. Save Your WebSocket Script: Save your script (e.g., websocket_server.py) in the ~/websocket-server folder.

3. Update and Install Dependencies:

    ```bash
    sudo apt update
    sudo apt install python3-websockets


4. Create a Systemd Service File: To ensure the WebSocket server runs continuously, create a systemd service file:
    ```bash
    sudo nano /etc/systemd/system/websocket_server.service

5. The File Content 
    ```ini
    [Unit]
    Description=WebSocket Server
    After=network.target

    [Service]
    ExecStart=/usr/bin/python3 /home/pi/websocket-server/websocket_server.py
    Restart=always
    User=pi
    WorkingDirectory=/home/pi/websocket-server

    [Install]
    WantedBy=multi-user.target

5. Enable and Start the Service: Execute the following commands to enable and start the service:

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl start websocket_server.service
    sudo systemctl enable websocket_server.service
    sudo systemctl status websocket_server.service