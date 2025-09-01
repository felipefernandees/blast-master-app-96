import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Star, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Award,
  HelpCircle,
  ShoppingCart,
  FileText,
  TrendingDown
} from "lucide-react"

const GrupoVendas = () => {
  // Mock data - substituir por dados reais da API
  const pessoasEngajadas = [
    { nome: "Maria Silva", mensagens: 47, conversao: 85, pontuacao: 892 },
    { nome: "João Santos", mensagens: 43, conversao: 78, pontuacao: 834 },
    { nome: "Ana Costa", mensagens: 39, conversao: 82, pontuacao: 785 },
    { nome: "Pedro Lima", mensagens: 35, conversao: 75, pontuacao: 723 },
    { nome: "Carla Oliveira", mensagens: 32, conversao: 88, pontuacao: 701 }
  ]

  const perguntasFrequentes = [
    { pergunta: "Qual o prazo de entrega?", frequencia: 45 },
    { pergunta: "Tem desconto para compra em quantidade?", frequencia: 38 },
    { pergunta: "Quais formas de pagamento?", frequencia: 34 },
    { pergunta: "Tem garantia?", frequencia: 29 },
    { pergunta: "Fazem entrega no interior?", frequencia: 25 }
  ]

  const potenciaisCompradores = [
    { nome: "Lucas Ferreira", interesse: 95, ultimaInteracao: "2h", status: "quente" },
    { nome: "Beatriz Alves", interesse: 87, ultimaInteracao: "4h", status: "quente" },
    { nome: "Rafael Souza", interesse: 73, ultimaInteracao: "1d", status: "morno" },
    { nome: "Julia Pereira", interesse: 68, ultimaInteracao: "2d", status: "morno" },
    { nome: "Diego Martins", interesse: 52, ultimaInteracao: "3d", status: "frio" }
  ]

  const vendedores = [
    { nome: "Carlos Roberto", vendas: 23, engagement: 94, comissao: 4850 },
    { nome: "Fernanda Lima", vendas: 19, engagement: 89, comissao: 3990 },
    { nome: "Ricardo Nunes", vendas: 17, engagement: 86, comissao: 3570 },
    { nome: "Patrícia Gomes", vendas: 15, engagement: 83, comissao: 3150 }
  ]

  const metricas = {
    entrada: { total: 234, variacao: 12.5 },
    saida: { total: 45, variacao: -8.3 },
    gastoAds: { total: 15680, variacao: 5.7, roi: 3.2 }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'quente':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">🔥 Quente</Badge>
      case 'morno':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">⚡ Morno</Badge>
      case 'frio':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">❄️ Frio</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Grupo de Vendas</h1>
        <p className="text-muted-foreground">Dashboard completo para gestão de vendas no WhatsApp</p>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrada de Leads</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metricas.entrada.total}</div>
            <p className="text-xs text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{metricas.entrada.variacao}% este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saída de Clientes</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metricas.saida.total}</div>
            <p className="text-xs text-emerald-600 flex items-center">
              <TrendingDown className="w-3 h-3 mr-1" />
              {metricas.saida.variacao}% este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gasto em Ads</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {metricas.gastoAds.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              ROI: {metricas.gastoAds.roi}x | +{metricas.gastoAds.variacao}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pessoas mais engajadas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Pessoas Mais Engajadas
            </CardTitle>
            <CardDescription>Top 5 clientes com maior engajamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pessoasEngajadas.map((pessoa, index) => (
                <div key={pessoa.nome} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <div>
                      <p className="font-medium">{pessoa.nome}</p>
                      <p className="text-sm text-muted-foreground">{pessoa.mensagens} mensagens</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{pessoa.conversao}%</p>
                    <p className="text-xs text-muted-foreground">{pessoa.pontuacao} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Perguntas mais frequentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              Perguntas Mais Frequentes
            </CardTitle>
            <CardDescription>Dúvidas que mais aparecem no chat</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {perguntasFrequentes.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{item.pergunta}</p>
                    <Badge variant="secondary">{item.frequencia}x</Badge>
                  </div>
                  <Progress value={(item.frequencia / 45) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Potenciais compradores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Potenciais Compradores
            </CardTitle>
            <CardDescription>Leads com maior probabilidade de conversão</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {potenciaisCompradores.map((lead, index) => (
                <div key={lead.nome} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{lead.nome}</p>
                    <p className="text-xs text-muted-foreground">Última interação: {lead.ultimaInteracao}</p>
                  </div>
                  <div className="text-right space-y-1">
                    {getStatusBadge(lead.status)}
                    <p className="text-sm font-medium">{lead.interesse}% interesse</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vendedores mais engajados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Vendedores Mais Engajados
            </CardTitle>
            <CardDescription>Performance da equipe de vendas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendedores.map((vendedor, index) => (
                <div key={vendedor.nome} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <div>
                      <p className="font-medium">{vendedor.nome}</p>
                      <p className="text-sm text-muted-foreground">{vendedor.vendas} vendas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {vendedor.comissao.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{vendedor.engagement}% engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Relatórios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Relatórios Recentes
            </div>
            <Button variant="outline" size="sm">
              Ver Todos
            </Button>
          </CardTitle>
          <CardDescription>Últimos relatórios gerados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Relatório Semanal</h4>
              <p className="text-sm text-muted-foreground">Performance da última semana</p>
              <Button variant="ghost" size="sm" className="mt-2">Baixar PDF</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Análise de Conversão</h4>
              <p className="text-sm text-muted-foreground">Taxa de conversão por canal</p>
              <Button variant="ghost" size="sm" className="mt-2">Baixar PDF</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">ROI de Campanhas</h4>
              <p className="text-sm text-muted-foreground">Retorno dos investimentos em ads</p>
              <Button variant="ghost" size="sm" className="mt-2">Baixar PDF</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GrupoVendas