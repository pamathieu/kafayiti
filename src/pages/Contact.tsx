import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Non obligatwa").max(100, "Non twò long"),
  email: z.string().trim().email("Imèl pa valid").max(255, "Imèl twò long"),
  subject: z.string().trim().min(1, "Sijè obligatwa").max(200, "Sijè twò long"),
  message: z.string().trim().min(1, "Mesaj obligatwa").max(1000, "Mesaj twò long (maksimòm 1000 karaktè)"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    // In a real application, this would send to a backend
    toast({
      title: "Mesaj voye!",
      description: "Mèsi pou mesaj ou. Nou pral reponn ou byento.",
    });
    form.reset();
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adrès",
      lines: ["874 Rue Ste Catherine", "Léogâne, Ayiti"],
    },
    {
      icon: Phone,
      title: "Telefòn",
      lines: ["+509 XXXX-XXXX"],
    },
    {
      icon: Mail,
      title: "Imèl",
      lines: ["info@kafayiti.com"],
    },
    {
      icon: Clock,
      title: "Èdtan",
      lines: ["Lendi - Vandredi: 9:00 - 16:00", "Samdi: 9:00 - 13:00", "Dimanch: Fèmen"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-12 sm:py-16 md:py-20 text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
                Kontakte Nou
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl opacity-95">
                Nou la pou ede ou. Voye yon mesaj oswa vizite biwo nou.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Contact Form */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                    Voye Yon Mesaj
                  </h2>
                  <Card className="border-border shadow-primary">
                    <CardContent className="pt-6">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Non Konplè</FormLabel>
                                <FormControl>
                                  <Input placeholder="Antre non ou" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Imèl</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="ou@egzanp.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sijè</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ki sa ou vle pale de?" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mesaj</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Ekri mesaj ou isit..." 
                                    className="min-h-[120px] resize-none"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" size="lg" className="w-full">
                            <Send className="w-4 h-4 mr-2" />
                            Voye Mesaj
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Info & Map */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                      Enfòmasyon Kontak
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {contactInfo.map((info, index) => (
                        <Card key={index} className="border-border hover:shadow-primary transition-all duration-300">
                          <CardContent className="pt-5 pb-5">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <info.icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                                {info.lines.map((line, i) => (
                                  <p key={i} className="text-sm text-muted-foreground">{line}</p>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Map */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                      Kote Nou Ye
                    </h2>
                    <Card className="border-border overflow-hidden">
                      <div className="aspect-video w-full">
                        <iframe
                          title="KAFA Office Location - Léogâne, Haiti"
                          src="https://www.openstreetmap.org/export/embed.html?bbox=-72.6500%2C18.5000%2C-72.6200%2C18.5200&layer=mapnik&marker=18.5100%2C-72.6350"
                          className="w-full h-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                      <CardContent className="py-3">
                        <a
                          href="https://www.openstreetmap.org/?mlat=18.5100&mlon=-72.6350#map=15/18.5100/-72.6350"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          <MapPin className="w-4 h-4" />
                          Wè sou OpenStreetMap
                        </a>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
