import { useTranslation } from "react-i18next";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const contactSchema = z.object({
    name: z.string().trim().min(1, t('contact.validation.nameRequired')).max(100, t('contact.validation.nameTooLong')),
    email: z.string().trim().email(t('contact.validation.emailInvalid')).max(255, t('contact.validation.emailTooLong')),
    subject: z.string().trim().min(1, t('contact.validation.subjectRequired')).max(200, t('contact.validation.subjectTooLong')),
    message: z.string().trim().min(1, t('contact.validation.messageRequired')).max(1000, t('contact.validation.messageTooLong')),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;
  
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
    toast({
      title: t('contact.form.success'),
      description: t('contact.form.successDesc'),
    });
    form.reset();
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.info.address'),
      lines: ["874 Rue Ste Catherine", "Léogâne, Ayiti"],
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      lines: ["+509 XXXX-XXXX"],
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      lines: ["info@kafayiti.com"],
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      lines: [t('footer.weekdays'), t('footer.saturday'), t('footer.sunday')],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-hero hero-padding text-primary-foreground">
          <div className="section-container">
            <div className="content-container text-center">
              <h1 className="hero-title">
                {t('contact.hero.title')}
              </h1>
              <p className="hero-subtitle">
                {t('contact.hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="max-w-6xl mx-auto">
              <div className="card-grid-2 lg:gap-12">
                
                {/* Contact Form */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                    {t('contact.form.title')}
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
                                <FormLabel>{t('contact.form.name')}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t('contact.form.namePlaceholder')} {...field} />
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
                                <FormLabel>{t('contact.form.email')}</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder={t('contact.form.emailPlaceholder')} {...field} />
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
                                <FormLabel>{t('contact.form.subject')}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t('contact.form.subjectPlaceholder')} {...field} />
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
                                <FormLabel>{t('contact.form.message')}</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder={t('contact.form.messagePlaceholder')} 
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
                            {t('contact.form.submit')}
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
                      {t('contact.info.title')}
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
                      {t('contact.info.location')}
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
                          {t('contact.info.viewOnMap')}
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
