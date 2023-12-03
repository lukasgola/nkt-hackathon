import matplotlib.pyplot as plt
import numpy as np

def temperature_ground_one():

    temperature = np.array([10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60])
    temp_rate  = np.array([1.1,1.05,1,0.95,0.89,0.84,0.77,0.71,0.63,0.55,0.45])

    plt.scatter(temperature,temp_rate, color='red')
    z = np.polyfit(temperature,temp_rate,2)
    p = np.poly1d(z)

    plt.plot(temperature,p(temperature), '--g')

    # Add a title
    plt.title('Wspolczynniki korygujace dla temperatury otaczajacego gruntu (YKY)')
    # Add X and y Label
    plt.xlabel('temperatura [stopnie C]')

    plt.ylabel('wspolczynnik korygujacy')
 
    plt.grid(alpha =.6, linestyle ='--')

    plt.text(30,0.8,str(f"        {p}"))
    plt.show()

def temperature_ground_two():

    temperature = np.array([10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80])
    temp_rate  = np.array([1.07,1.04,1,0.96,0.93,0.89,0.85,0.8,0.76,0.71,0.65,0.6,0.53,0.46,0.38])

    plt.scatter(temperature,temp_rate, color='red')
    z = np.polyfit(temperature,temp_rate,2)
    p = np.poly1d(z)

    plt.plot(temperature,p(temperature), '--g')

    # Add a title
    plt.title('Wspolczynniki korygujace dla temperatury otaczajacego gruntu (YKXS,YAKXS)')
    # Add X and y Label
    plt.xlabel('temperatura [stopnie C]')

    plt.ylabel('wspolczynnik korygujacy')
 
    plt.grid(alpha =.6, linestyle ='--')

    plt.text(30,0.8,str(f"        {p}"))
    plt.show()
